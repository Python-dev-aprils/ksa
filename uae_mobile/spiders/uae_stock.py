# -*- coding: utf-8 -*-
import scrapy
import re
import json
import uuid
import datetime
import time
from scrapy.http import Request, FormRequest
from scrapy.shell import inspect_response
from pprint import pprint
from uae_mobile.items import UaeMobileItem
import logging
logger = logging.getLogger('MobileAPI Logger')


class UaeStockSpider(scrapy.Spider):
    name = "uae"
    allowed_domains = ["*"]
    start_urls = ['http://www.baidu.com']

    target_url = "https://mobileapi.souq.com/v1/products/%s?city_id=&show_attributes=1" \
                 "&show_offers=1&show_variations=1&country=sa&language=en&format=json&app_id=61506485&" \
                 "app_secret=Fh6Q9BRCpNTlLcnEqHNV&platform=ANDROID&" \
                 "c_ident=14981909405422&signature=b4f9d2aef9acfd8dcb80da25b67d7881"

    url_head = 'https://saudi.souq.com/sa-en/search_results.php?q='

    def parse(self, response):
        p_urls = []
        with open('urls.txt', 'r') as f:
            urls = f.readlines()

        urls = [url.strip() for url in urls]

        for url in urls:
            if 's' in url:
                p_urls.append(url)
                continue
            else:
                if '?' not in url:
                    url += '/p/?section=2&page=1'
                else:
                    url += '&section=2'
                p_urls.append(url)

        # p_urls = [url + '/p/?section=2&page=1' if '?' not in url else url + '&section=2' for url in urls]
        for p_url in p_urls:
            yield Request(p_url, callback=self.handle_request_center, dont_filter=True)

    def handle_request_center(self, response):
        item_ids = response.css('img.img-size-medium.lazy-loaded::attr(src)').re(r'item_L_(\d+)_')
        urls = [self.target_url % item_id for item_id in item_ids]
        for url in urls:
            yield scrapy.Request(url, callback=self.landof, dont_filter=True)

        next_url = response.css('li.pagination-next.goToPage > a::attr(href)').extract_first()
        if next_url:
            next_url += '&section=2'
            yield scrapy.Request(next_url, callback=self.handle_request_center, dont_filter=True)

    def landof(self, response):
        offers = json.loads(response.body)['data']['offers']
        item = UaeMobileItem()
        x = 0

        try:
            item['id'] = uuid.uuid4()
            item['seller'] = offers[x]['seller']['name']
            item['EAN'] = offers[x]['ean']
            item['price'] = offers[x]['price']
            item['amount'] = offers[x]['available_quantity']
            item['image_url'] = offers[x]['product_images']["XL"][0]
            item['handling_time_code'] = offers[x]['handling_time_code']
            item['createdAt'] = int(round(time.time() * 1000))
            yield item
        except IndexError:
            logger.error(u'=======商品下架=========')
