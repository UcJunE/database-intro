# showing database

commands related to databases in Mongo

## show all databases

show databases

```

to set a database as active:
```

use sample_airbnb

To show collections in a database:

```
show collections
```

# Find documents by criteria

```
db.listingsAndReviews.find().pretty().limit(5);
```

- `db` : the current active database
- `listingsAndReviews`: The collection
- `.pretty()`:format it nicely
- `.limit(5)`:Only the first five records

## Projection

we only want to see certain key/value pairs.

so for instance , to see only the `beds` and `name`:

```
db.listingsAndReviews.find({},{
    'name':1,
    'bed':1
    });
```

Example 2 : to see only the `name` and the `price`

```
db.listingsAndReviews.find({},{
    'name':1,
    'price':1
})
```

if we set the value to 1 means true and its show , if we set to 0 then it wont show

## Find documents by a criteria

We only want to see documents where the number of beds is 2

```

db.listingsAndReviews.find({
    'beds':2
},{
    'name':1,
    'beds':1
})
```

##Multiple critera
Find by number of beds and bedrooms .By default , if we have multiple key/value pairs for the critera , then it is an AND

```
db.listingsAndReviews.find({
    'beds':2,
    'bedrooms':2
},{
    'name':1,
    'beds':1,
    'bedrooms':1
})
```

## Seacrh by keys of nested object

```
db.listingsAndReviews.find({
    'address.country':"Brazil"
},
{
    'name':1,
    'address.country':1
})
```

### Find all documents with 2 beds , 2 bedr ooms and in Brazil

```
db.listingsAndReviews.find({
    'bed':2,
    'bedrooms':2,
    'address.country':"Brazil"
},
{
    'name':1,
    'beds':1,
    'bedrooms':1,
    'address.country':1
})
```

## Filter by inequalily

- $gt greater than
- $lt lesser than

- $gte greater than or equal
- $lte lesser than or equal

db.listingsAndReviews.find({
'bedrooms':{
'$gte':3,
        '$lte':6
}
},{
'bedrooms':1,
'name':1
})

## Find all listings in Brazit that has between 3-6 bedrooms

db.listingsAndReviews.find({
'address.country':"Brazil",
'bedrooms':{
'$gte':3,
        '$lte':6
}
},{
'name':1,
'address.country':1,
'bedrooms':1,
'name':1
})

## Find by more than one country

db.listingsAndReviews.find({
"$or":[
        {
            "address.country":"Brazil"
        },
        {
            "address.country":"Canada"
        }
    ],'bedrooms':{
        '$gt':3
}
},{
'name':1,
'address.country':1,
"bedrooms":1
})

## Find all listings that have oven

db.listingsAndReviews.find({
"amenities":"Oven"
},
{
"name":1,
"amenities":1
})

```
Even though `amenities` is an array , we could just apply the string to look for the array

```

## FInd all listings that have `one` or `more` of the FOLLOWING

```
db.listingsAndReviews.find({
    'amenities':{
        "$in":["Oven","Microwave","Stove"]
    }
},
{
    "name":1,
    "amenities"1
})

```

- `$in`

## Find all the listings that ALL of the following inside their amenities array

```
db.listingsAndReviews.find({
    "amenities":{
        "$all":["Oven","Microwave","Stove"]
    }
},
{
    "name":1,
    "amenities":1
})
```

- `$all`

## Find by date

`Find all the listing and reviews after 2019`

```
db.listingsAndReviews.find({
    "first_review":{
        "$gt":ISODate("2018-12-31")
    }
},{
    "name":1,
    "first_review":1
})

```

`ISODate()` to create a date object

## Find all listings where the name includes "spacious"

```
db.listingsAndReviews.find({
    "name":{
        "$regex":"spacious","$options":"i"
    }
},{
    "name":1
})

```

- `$regex` is to search by certain criteria
- `$options` : the "i" is to ignore case sensitive
- `elemMatch` : only use for array , .

## Find all the reviewer name

```
db.listingsAndReviews.find({
    "reviews":{
        "$"eleMatch":{
            "reviewer_name":"Davi"
        }
    }
},{
    "name":1,
    "reviews.$":1
})
```

## Find data via id

```
db.movies.find({
    _id:ObjectId("5a9427648b0beebeb69579e7")
})
```

- `ObjectId()` function
