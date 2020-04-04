const { graphql } = require('graphql');
const  { schema } = require('../../index');

const { createOneAuthor } = require('../services/AuthorService');

const setUpTest = require('./helpers');

const MUTATION_CREATE_AUTHOR = `
    mutation createAuthor($data:AuthorCreateInput!){
        createAuthor(data:$data){
            _id
            email
        }
    }
`;

const MUTATION_UPDATE_AUTHOR = `
    mutation updateAuthor($data:AuthorUpdateInput!){
        updateAuthor(data:$data){
            _id
            email
        }
    }
`;

//describe marcar un grupo de tests
// it ó test 

// eslint-disable-next-line no-undef
describe('Test Create Author Mutation', ()=> {
    // eslint-disable-next-line no-undef
    beforeEach( async () => await setUpTest());
    // eslint-disable-next-line no-undef
    it('Should Create Author', (done) => {
        const makeTest = async() => {
            const data = {
                first_name: 'prueba',
                last_name: 'prueba',
                email: 'p@p.com',
                password: 'prueba',
            };

            graphql(schema, MUTATION_CREATE_AUTHOR,null, {}, { data })
                .then(res => {
                    // eslint-disable-next-line no-undef
                    expect(res.data.createAuthor).toHaveProperty('_id');
                    // eslint-disable-next-line no-undef
                    expect(res.data.createAuthor).toHaveProperty('email', data.email);
                    done();
                });
        };
        makeTest();
    }, 300000);
    // eslint-disable-next-line no-undef
    it('Should not Create Author', (done) =>{
        const makeTest = async() => {
            const data = {
                first_name: 'prueba',
                last_name: 'prueba',
                email: 'p@p.com',
                password: 'prueba',
            };

            await createOneAuthor(data);
            graphql(schema, MUTATION_CREATE_AUTHOR, null, {}, { data })
                .then(res => {
                    // eslint-disable-next-line no-undef
                    expect(res).toHaveProperty('errors');
                    done();
                });
        };
        makeTest();
    }, 300000);
});


// eslint-disable-next-line no-undef
describe('Test Update Author Mutation', ()=> {
    // eslint-disable-next-line no-undef
    beforeEach( async () => await setUpTest());
    // eslint-disable-next-line no-undef
    it('Should Update Author', (done) =>{
        const makeTest = async () => {
            const user = {
                first_name: 'prueba',
                last_name: 'prueba',
                email: 'p@p.com',
                password: 'prueba',
            };
    
            const userAuth = await createOneAuthor(user);
    
            const data = {
                email: 'pEdit@p.com',
            };
    
            graphql(schema, MUTATION_UPDATE_AUTHOR, null, { userAuth }, { data })
                .then(res => {
                    // eslint-disable-next-line no-undef
                    expect(res.data.updateAuthor).toHaveProperty('email', data.email);
                    done();
                });
        };
        makeTest();
    });

    // eslint-disable-next-line no-undef
    it('Should not Update Author', (done) =>{
        const makeTest = async () => {
    
            const userAuth = {};
    
            const data = {
                email: 'pEdit@p.com',
            };
    
            graphql(schema, MUTATION_UPDATE_AUTHOR, null, { userAuth }, { data })
                .then(res => {
                    // eslint-disable-next-line no-undef
                    expect(res).toHaveProperty('errors');
                    done();
                });
        };
        makeTest();
    });
}); 

