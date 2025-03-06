import ListNavbar from "../components/ListNavbar"

const Navbar = () => {
  return (
    <div className="w-full flex justify-center pt-5 absolute">
      <div className="w-6xl flex justify-between items-center px-12 py-5 rounded-xl shadow-md bg-white/60 backdrop-blur-sm">
        <h1 className="font-semibold text-md text-sky-950">MySkin</h1>
        <div className="flex gap-x-4">
          <ListNavbar>Beranda</ListNavbar>
          <ListNavbar>FAQ</ListNavbar>
        </div>
        <button className="font-extralight text-md cursor-pointer">Masuk</button>
      </div>
    </div>
  );
}

export default Navbar