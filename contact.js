const express= require('express');
const port= 8003;
const path= require('path');
const { stringify } = require('querystring');

const db= require('./config/mongoose');
const Contact= require('./models/contact2');
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
    // console.log('post');
    // console.log(request.body);
    // console.log(request.body.name);
    // console.log(request.body.phone);

    // contactList.push({
       // name: request.body.name,
        //phone:request.body.phone
    // });

    // contactList.push(request.body);
    /*Contact.create(
    {
        name:request.body.name,
        phone:request.body.phone
    },function(err,newContact)
    {
        if(err)
        {
            console.log('error in creating a contact');
            return;
        }

        console.log('*******',newContact);
        return response.redirect('back');
    });
    // return response.redirect('back');*/

    const newContact = {
        name: request.body.name,
        phone: request.body.phone
      };
      
      Contact.create(newContact)
        .then((createdContact) => {
          console.log('New contact created:', createdContact);
          response.redirect('back');
        })
        .catch((error) => {
          console.error('Error creating a contact:', error);
          // Handle the error appropriately
        });
      
      
      
});


app.get('/delete-contact/',function(request,response)
{
    let id = request.query.id.trim(); // Remove leading/trailing whitespace
  
    console.log('Deleting document with ID:', id); // Log the ID to verify its value
  
    // delete contact by id
    Contact.findByIdAndDelete(id)
      .then(() => {
        console.log('Deleted document:');
        return response.redirect('back');
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
        return response.redirect('back');
      });
      
    /*console.log(request.query);
    let phone=request.query.phone;
    console.log(phone);

    let contactIndex=contactList.findIndex(contact => (parseInt(contact.phone) == phone));
    console.log(contactIndex);

    if(contactIndex != -1)
    {
        contactList.splice(contactIndex,1);
    }

    return response.redirect('back');*/
});

app.get('/', function(request,response)
{
    // console.log(request.myname);
    Contact.find({})
        .then((contacts) => {
                console.log('Query results:', contacts);
                return response.render('home',{
                    //title:"my contact list",
                    contact_list:contacts
                })
            })
        .catch((error) => {
            console.error('Error executing query:', error);
  });
    /*Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('error');
            return;

        }
        
    });

    });*/

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