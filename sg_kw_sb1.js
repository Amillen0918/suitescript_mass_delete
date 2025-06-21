/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 *
 * author: amillen
 *
 */
define(
    ['N/record', 'N/search', 'N/log'], (record, search, log) => {

    const getInputData = (context) => {

        return search.create({type: search.Type.INVENTORY_ITEM});

    };

    const map = (mapContext) => {

        let oSearchResult = JSON.parse(mapContext.value);

        let sItemId = oSearchResult.id;

        if (sItemId) {

            record.delete({
                type: record.Type.INVENTORY_ITEM,
                id: sItemId
            });

            mapContext.write({
                key: 'inventory item deletion status: ',
                values: 'success'
            });

        }

        mapContext.write({
            key: 'inventory item deletion status: error ',
            values: 'no inventory item id'
        });

    };

    const summarize = (summarizeContext) => {

            summarizeContext.output.iterator().each((key, value) => {

                log.audit({title: 'summarize', detail: key + ', ' + value});

            });

    };

    return {getInputData, map, summarize};

});