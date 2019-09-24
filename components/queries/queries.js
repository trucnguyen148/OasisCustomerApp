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
export  {getBookingsQuery, getServicesQuery}