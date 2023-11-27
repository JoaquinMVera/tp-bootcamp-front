import { Link, Outlet } from "react-router-dom";
import style from "../styles/SearchBar.module.scss"
import Lupita from "../assets/Vector.svg";
import { useAppDispatch } from "../hooks";
import { updateSearchBar } from "../slices/searchBarSlice";

const SearchBar = () => {

	const dispatch = useAppDispatch();


	return(
		<div className={style.searchContainer}>

            <div className ={style.inputContainer}>

            <img src = {Lupita} alt ="An icon of a land"/>
            <input type="text" id="" placeholder="Buscar eventos" onChange={(e) => dispatch(updateSearchBar(e.target.value)) }></input>
            </div>
           
        </div>
	)
}

export default SearchBar;