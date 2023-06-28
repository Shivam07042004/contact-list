const express= require('express');
const port= 8003;
const path= require('path');
const { stringify } = require('querystring');

const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

let contactList= [
    {
        name: 'trump',
        phone: '01234567689'
    },
    {
        name: 'biden is',
        phone: '1111111111'
    },
    {
        name: 'obama',
        phone: '2134345466'
    }
];

app.post('/create-contact',function(request,response)
{
    console.log(request.body);
    contactList.push(request.body);
    return response.redirect('back');
});


app.get('/delete-contact/',function(request,response)
{
    console.log(request.query);
    let phone=request.query.phone;
    console.log(phone);

    let contactIndex=contactList.findIndex(contact => (parseInt(contact.phone) == phone));
    console.log(contactIndex);

    if(contactIndex != -1)
    {
        contactList.splice(contactIndex,1);
    }

    return response.redirect('back');
});

app.get('/',function(request,response)
{
    return response.render('home',
    {

        title: 'my contact list',
        contact_list:contactList
    });
});

app.listen(port,function(error)
{
    if(error)
    {

        console.log('error at port ',port);
        return;
    }

    console.log('server is running');
});