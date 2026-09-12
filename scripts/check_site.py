#!/usr/bin/env python3
"""Check built pages, navigation, local links, image metadata, and sitemap."""
from collections import Counter
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

from build import BASE, PAGES, ROOT


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = []
        self.links = []
        self.images = []
        self.tags = Counter()
        self.active = []
        self.nav_links = []
        self.in_nav = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags[tag] += 1
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'nav':
            self.in_nav = attrs.get('aria-label') == 'Main navigation'
        if tag == 'a' and self.in_nav:
            self.nav_links.append(attrs.get('href', ''))
            if attrs.get('aria-current') == 'page':
                self.active.append(attrs['href'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
        if tag == 'img':
            self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_nav = False


def main():
    pages = {ROOT / name: Page(ROOT / name) for name, *_ in PAGES}
    expected_nav = [name for name, _, label, *_ in PAGES if label]
    errors = []
    references = 0
    for path, page in pages.items():
        def check(condition, message):
            if not condition:
                errors.append(f'{path.name}: {message}')
        check(page.tags['h1'] == 1, 'Expected one H1')
        check(page.tags['main'] == 1, 'Expected one main landmark')
        check(len(page.ids) == len(set(page.ids)), 'Duplicate element IDs')
        check([link.lstrip('/') for link in page.nav_links] == expected_nav, 'Navigation links are incomplete or out of order')
        check(page.active == ([path.name] if path.name != '404.html' else []), 'Incorrect active navigation item')
        for img in page.images:
            check(bool(img.get('alt')), 'Image is missing descriptive alt text')
            check(bool(img.get('width') and img.get('height')), 'Image is missing dimensions')
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            references += 1
            dest = (ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/') else (path.parent / unquote(url.path))
            if not url.path:
                dest = path
            if dest.is_dir():
                dest /= 'index.html'
            check(dest.is_file(), f'Broken local reference: {link}')
            if url.fragment and dest in pages:
                check(unquote(url.fragment) in pages[dest].ids, f'Broken anchor: {link}')
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    locations = [node.text for node in sitemap.findall('.//{*}loc')]
    expected = [BASE if name == 'index.html' else BASE + name for name in expected_nav]
    if locations != expected:
        errors.append('Sitemap does not cover all public pages')
    for path in (ROOT / 'assets/figures').glob('*.svg'):
        ET.parse(path)
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Passed: {len(pages)} pages, {references} local references, navigation, anchors, image metadata, SVG XML, and sitemap.')


if __name__ == '__main__':
    main()
