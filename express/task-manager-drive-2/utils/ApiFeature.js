const Tour = require('../src/models/tour')

class ApiFeature {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObject = {...this.queryString}
        const excludedField = ['page','limit' ,'sort' ,'fields' ]
        excludedField.forEach(el => {
            delete queryObject[el]
        })
        let queryStr = JSON.stringify(queryObject)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query.find(JSON.parse(queryStr))
        return this
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }
        return this
    }

    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }
        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        this.query.skip(skip).limit(limit)
        // if(this.queryString.page){
        //     const countDocument =await User.countDocuments()
        //     if(skip >= countDocument){
        //         throw new Error('This page does not exist')
        //     }
        // }
        return this
    }
}

module.exports = ApiFeature