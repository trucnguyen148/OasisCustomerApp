import gql from "graphql-tag";

const getBookingsQuery = gql`
  {
    bookings{
        id
        date_time
        cus{
            id
            name
        }
        emp{
            id
            name
        }
    }
  }
`
const getServicesQuery = gql`
  {
    positions(type: 2) {
      id
      name
    },
    product_type(type: 2) {
        id 
        name 
        unit_price
        category{
          id
        }
      }
  }
`
const getProductsQuery = gql`
  {
    positions(type: 1) {
      id
      name
    },
    product_type(type: 1) {
        id 
        name 
        unit_price
        description
        category{
          id
        }
      }
  }
`
const createCategoryQuery = gql`
  mutation($name: String, $type: Int){
    createCategory(input: {
      type: $type,
      name: $name,
    }) {
        id 
      }
  }
`

export { getBookingsQuery, getServicesQuery, getProductsQuery, createCategoryQuery }