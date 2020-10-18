import {DefaultCrudRepository} from '@loopback/repository';
import {Products, ProductsRelations} from '../models';
import {ProductsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {
  constructor(
    @inject('datasources.Products') dataSource: ProductsDataSource,
  ) {
    super(Products, dataSource);
  }

  private isNumeric(param: any) {
    return !isNaN(parseFloat(param)) && isFinite(param);
  }

  private isPalindrome(param: any) {
    const string = param.toString();
    const palindromeMinimalLength = process.env.PALINDROME_MINIMAL_LENGTH || 3;
    if (string.length < palindromeMinimalLength) {
      return false;
    }
    const allowedCharacters = /[\W_]/g;
    var lowerString = string.toLowerCase().replace(allowedCharacters, '');
    var reverseString = lowerString.split('').reverse().join('');
    return reverseString === lowerString;
  }

  private applyPriceDiscountPercentage(result: Products, percentage: any): Products {
    result.discountPercentage = parseFloat(percentage);
    result.originalPrice = result.price;
    result.price = Math.ceil((result.discountPercentage / 100) * parseInt(result.originalPrice, 10));
    return result;
  }

  async findCustom(filter: any) {
    if (!filter.where.custom) {
      return this.find(filter);
    }

    const customSearch: string = filter.where.custom;
    let results: Array<Products> = [];

    if (this.isNumeric(customSearch)) {
      results = await this.find({
        where: { id: customSearch },
        limit: 1,
      });
    }
    if (!results.length) {
      results = await this.find({
        where: {
          or: [
            { brand: { like: customSearch } },
            { description: { like: customSearch } },
          ],
        },
      });
    }

    const isPalindrome = this.isPalindrome(customSearch);
    const resultsPalindromeDiscount = process.env.PALINDROME_SEARCH_DISCOUNT_PERCENTAGE || 50;
    for (let result of results) {
      if (isPalindrome) {
        result = this.applyPriceDiscountPercentage(result, resultsPalindromeDiscount);
      }
      delete result._id;
    }

    return results;
  }
}
