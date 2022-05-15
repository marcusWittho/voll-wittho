import React from 'react';
import styles from './ProductsList.module.css';
import Header from '../header/Header';
import { UserContext } from '../../UserContext';

function ProductList() {
  const { data } = React.useContext(UserContext);

  return (
    <section className={styles.products}>
      <Header user={data} />

    </section>
  );
}

export default ProductList;
