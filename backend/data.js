import bcrypt from 'bcryptjs';
const data={
   users:[

      {
         name:'Ivan',
         email:'jorgovanovicivan@gmail.com',
         password: bcrypt.hashSync('123456'),
         isAdmin:true
      },
      {
         name:'Pera',
         email:'pera@gmail.com',
         password: bcrypt.hashSync('123456'),
         isAdmin:false
      },
   ],
 products:[
{
//_id:'1',
name:'Mission to Mercury',
slug:'omega-mercur-watch',
category:'Watches',
image:'/images/p3.jpg',
price:120,
countInStock:20,
brand:'Omega',
rating:4.5,
numReviews:10,
description:'A tribute to the fast-moving winged messenger in deep grey.',

},
{
   // _id:'2',
    name:'Mission to Jupiter',
    slug:'omega-ko-watch',
    category:'Watchs',
    image:'/images/p5.jpg',
    price:120,
    countInStock:20,
    brand:'Omega',
    rating:4.5,
    numReviews:10,
    description:'Bronze-colored collectable with orange “Ultraman” seconds hand.',
    
    },

    {
        //_id:'3',
        name:'Mission to the Moon',
        slug:'omega-moon-watch',
        category:'Watches',
        image:'/images/p1.jpg',
        price:120,
        countInStock:20,
        brand:'Omega',
        rating:4.5,
        numReviews:10,
        description:'Follows the exact design and dimensions of the Omega Speedmaster Moonwatch.',
        
        },

        {
           // _id:'4',
            name:'Mission to Saturn',
            slug:'omega-saturn-watch',
            category:'Watches',
            image:'/images/p4.jpg',
            price:250,
            countInStock:20,
            brand:'Omega',
            rating:4.5,
            numReviews:10,
            description:'Beautiful beige with Saturn’s rings at 6 o’clock.',
            
            },
            {
                //_id:'5',
                name:'Mission to Earth',
                slug:'omega-earth-watch',
                category:'Watches',
                image:'/images/p2.jpg',
                price:250,
                countInStock:20,
                brand:'Omega',
                rating:4.5,
                numReviews:10,
                description:'Beautiful beige with Saturn’s rings at 6 o’clock.',
                
                },
                {
                   // _id:'6',
                    name:'Mission to Venus',
                    slug:'omega-uran-watch',
                    category:'Watches',
                    image:'/images/p6.jpg',
                    price:250,
                    countInStock:20,
                    brand:'Omega',
                    rating:4.5,
                    numReviews:10,
                    description:'Beautiful beige with Saturn’s rings at 6 o’clock.',
                    
                    },
                    {
                       // _id:'7',
                        name:'Mission to Pluto',
                        slug:'omega-pluto-watch',
                        category:'Watches',
                        image:'/images/p7.jpg',
                        price:250,
                        countInStock:20,
                        brand:'Omega',
                        rating:4.5,
                        numReviews:10,
                        description:'Beautiful beige with Saturn’s rings at 6 o’clock.',
                        
                        },
                        {
                           // _id:'8',
                            name:'Mission to Mars',
                            slug:'omega-mars-watch',
                            category:'Watches',
                            image:'/images/p8.jpg',
                            price:250,
                            countInStock:20,
                            brand:'Omega',
                            rating:4.5,
                            numReviews:10,
                            description:'Beautiful beige with Saturn’s rings at 6 o’clock.',
                            
                            },

    ],
};

export default data;