import React from "react";
import PizzaImage from "../../assets/pizza.jpg";
import styles from "./PizzaImage.css";

const pizzaImage = props => (
	<div className={styles.PizzaImage}>
		<img src={PizzaImage} alt="Pizza" className={styles.PizzaImg}/>
	</div>
);

export default pizzaImage;