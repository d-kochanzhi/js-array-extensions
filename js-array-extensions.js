var arrayExt = arrayExt || {};
/**
 * @method UniqueBy - Возвращает массив из уникальных занчений входящего массива
 * @param arr - Массив из объектов
 * @param fields - Свойства по которым должна проверяться уникальность
 */
arrayExt.UniqueBy = function (arr, fields) {
    var result = [];
    if (!arr || !fields || fields.length == 0) return arr;
    arr.forEach(function (item) {
        /*generate uniqueID*/
        var uniqueID = '';
        fields.forEach(function (key) {
            uniqueID += item[key];
        });
        /*search uniqueID in result*/
        found = result.filter(function (i) {
            return i.uniqueID == uniqueID;
        });
        /*add item to result if not exists*/
        if (!found || found.length == 0) {
            var o = {};
            o.uniqueID = uniqueID;
            fields.forEach(function (key) {
                o[key] = item[key];
            });
            result.push(o);
        }
    });
    return result;
}
/**
 * @method FilterBy - Отфильтровать массив по набору фильтров
 * @param arr - Массив из объектов
 * @param filters - Параметры для фильтрации массива (название поля, его значение)[{key:'', value:'[array/any type]', operator:'not [equal/like]'}]
 */
arrayExt.FilterBy = function (arr, filters) {
    var result = [];
    if (!arr || !filters || filters.length == 0) return arr;
    result = arr.filter(function (item) {
        var itemSuitable = true;
        filters.forEach(function (f) {
			var filterValues = [];
            var filterInvers = false;
            var filterSuitable = false;
            var op = f.operator
            if (f.operator && f.operator.indexOf('not') > -1) {
                filterInvers = true;
                op = f.operator.substring(4);
            }		
			if (Array.isArray(f.value))			
				filterValues = f.value;
			else
				filterValues.push(f.value);
			
            /*TODO: make filters AND/OR */
            switch (op) {
                /*[like] always string*/
                case 'like':					 
						filterSuitable = filterValues.some(function(element, index, array){
							return String(item[f.key]).indexOf(element) > -1;
						});
                    
                    break;
                case 'equal':
                default:
						filterSuitable = filterValues.some(function(element, index, array){
							return item[f.key] == element;
						});
                    
            }
            if (filterInvers) filterSuitable = !filterSuitable;
            itemSuitable = itemSuitable & filterSuitable;
        });
        return itemSuitable;
    });
    return result ? result : [];
};
/**
 * @method SortBy - Отсортировать массив по полям
 * @param arr - Массив из объектов
 * @param fields - поля по которым нужно отфильтровать ['a','b','-c']
 */
arrayExt.SortBy = function (arr, fields) {
    if (!arr || !fields || fields.length == 0) return arr;
    var s = '';
    fields.forEach(function (f, idx) {
        var d = 1;
        if (f.charAt(0) == '-') {
            d = -1;
            f = f.slice(1);
        }
        s += 'if(arguments[0].' + f + (d == -1 ? '<' : '>') + 'arguments[1].' + f + ')return 1;';
        s += 'else if(arguments[0].' + f + '==arguments[1].' + f + ')';
        s += (idx < fields.length - 1) ? '{' : 'return 0';
    });
    s += Array(fields.length).join('}') + ';return -1;';
    return arr.sort(new Function(s));
};
