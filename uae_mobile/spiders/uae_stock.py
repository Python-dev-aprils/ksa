# -*- coding: utf-8 -*-
import scrapy
import re
import json
import uuid
import datetime
# import time

from ipdb import set_trace
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

    # url_head = 'https://saudi.souq.com/sa-en/search_results.php?q='

    def parse(self, response):
        p_urls = []
        with open('../urls.txt', 'r') as f:
            urls = f.read()
        obj = json.loads(urls)
        # set_trace()
        # arr = []
        # for i in obj:
        #     arr.append(i["url"].strip())
        # for url in arr:
        #     if 's' in url:
        #         p_urls.append(url)
        #         continue
        #     else:
        #         if '?' not in url:
        #             url += '/p/?section=2&page=1'
        #         else:
        #             url += '&section=2'
        #         p_urls.append(url)

        for url in obj:
            if 's' in url["url"]:
                p_urls.append(url)
                continue
            else:
                if '?' not in url["url"]:
                    url["url"] += '/p/?section=2&page=1'
                else:
                    url["url"] += '&section=2'
                p_urls.append(url)
        # p_urls = [url + '/p/?section=2&page=1' if '?' not in url else url + '&section=2' for url in urls]

        for item in p_urls:
            request= scrapy.Request(item["url"], callback=self.handle_request_center, dont_filter=True)
            request.meta['item'] = item
            yield request


    def handle_request_center(self, response):
        # set_trace()
        item = response.meta['item']
        item_ids = response.css('img.img-size-medium::attr(data-src)').re(r'item_L_(\d+)_')# 取ID
        urls = [self.target_url % item_id for item_id in item_ids]# 进行存储
        for url in urls:
            requestLandof = scrapy.Request(url, callback=self.landof, dont_filter=True)
            requestLandof.meta['itemData'] = item
            yield requestLandof

        next_url = response.css('li.pagination-next.goToPage > a::attr(href)').extract_first()
        if next_url:
            next_url += '&section=2'
            requestc= scrapy.Request(next_url, callback=self.handle_request_center, dont_filter=True)
            requestc.meta['item'] = item
            yield requestc

    def landof(self, response):
        itemData = response.meta['itemData']
        offers = json.loads(response.body)['data']['offers']
        reviews_count = json.loads(response.body)['data']['reviews_count']

        item = UaeMobileItem()
        x = 0
        aaa = uuid.uuid4()
        try:
            item['id'] = aaa
            item['seller'] = offers[x]['seller']['name']
            item['type'] = itemData["name"]
            item['EAN'] = offers[x]['ean']
            item['price'] = offers[x]['price']
            item['amount'] = offers[x]['available_quantity']
            item['image_url'] = offers[x]['product_images']["XL"][0]
            item['fulfilled_by_souq'] = offers[x]['fulfilled_by_souq']
            item['followNum'] = len(offers)
            item['reviews_count'] = reviews_count
            item['createdAt'] = datetime.datetime.now().strftime('%Y-%m-%d')
            # item['createdAt'] = int(round(time.time() * 1000)) 时间戳
            yield item
        except IndexError:
            logger.error(u'=======商品下架=========')
