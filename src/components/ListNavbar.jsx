import PropTypes from "prop-types"

const ListNavbar = ({children}) => {
  return (
    <>
        <a className="font-normal text-md text-black hover:text-gray-700 focus:font-bold" href="#">{children}</a>
    </>
  )
}

ListNavbar.propTypes = {
    children: PropTypes.node
}

export default ListNavbar