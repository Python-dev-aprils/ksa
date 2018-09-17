# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class UaeMobileItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field()
    seller = scrapy.Field()
    EAN = scrapy.Field()
    price = scrapy.Field()
    type = scrapy.Field()
    amount = scrapy.Field()
    image_url = scrapy.Field()
    fulfilled_by_souq = scrapy.Field()
    followNum = scrapy.Field()
    reviews_count = scrapy.Field()
    createdAt = scrapy.Field()
