import React from 'react'
import styles from './container.module.css';

const NewContactSection = () => {
  return (
    <div className={styles.containerfull}>
      <div className={styles.container}>
        <h4>
          O que você procura pode estar além desta página
        </h4>
        <p>
          Nosso site apresenta apenas uma curadoria do nosso catálogo de mais de 8 mil imóveis. Mande uma mensagem e descubra mais possibilidades.
        </p>
        <a 
           href="https://api.whatsapp.com/send/?phone=5511932062653&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
           target="_blank"
           className='' 
          >
          Fale com concierge Axpe
        </a>
      </div>
    </div>
  )
}

export default NewContactSection