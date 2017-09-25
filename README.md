# javascript Array extension

## functions

### live samples:

 * [SortBy](https://rawgit.com/d-kochanzhi/js-array-extensions/master/examples/SortBy.html)
 * [UniqueBy](https://rawgit.com/d-kochanzhi/js-array-extensions/master/examples/UniqueBy.html)
 * [FilterBy](https://rawgit.com/d-kochanzhi/js-array-extensions/master/examples/FilterBy.html)
 
## Usage

namespace arrayExt

### SortBy
```js
arrayExt.SortBy(myArrayOfObjects,[ "name", "-type" ]);
```
sorting by objects property "name" ascending  and property "type" descending

### UniqueBy
```js
arrayExt.UniqueBy(myArrayOfObjects,["name", "type"]);
```
getting unique objects by properties "name" and  "type" 

### FilterBy
```js
arrayExt.FilterBy(myArrayOfObjects,[ { "key": "name", "value": "John", "operator": "not like" } ]; );
```
filtering array by property "name" with value not like "John"

Operator | 
-------|
equal |
not equal|
like|
not like|

## License

This project is licensed under the MIT License