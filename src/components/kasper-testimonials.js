import { html, css, LitElement } from 'lit';

export class KasperTestimonials extends LitElement {
  static styles = css`
    .container {
      padding-left: 15px;
      padding-right: 15px;
      margin-left: auto;
      margin-right: auto;
    }
    /* Small */
    @media (min-width: 768px) {
      .container {
        width: 750px;
      }
    }
    /* Medium */
    @media (min-width: 992px) {
      .container {
        width: 970px;
      }
    }
    /* Large */
    @media (min-width: 1200px) {
      .container {
        width: 1170px;
      }
    }
    /* End Global Rules */
    /* Start Components */
    .main-heading {
      text-align: center;
    }
    .main-heading h2 {
      font-weight: normal;
      font-size: 40px;
      position: relative;
      margin-bottom: 70px;
      text-transform: uppercase;
    }
    .main-heading h2::before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      background-color: #333;
      bottom: -30px;
      width: 120px;
    }
    .main-heading h2::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #333;
      bottom: -38px;
      background-color: white;
    }
    .main-heading p {
      width: 550px;
      margin: 0 auto 100px;
      max-width: 100%;
      line-height: 2;
      color: #777;
    }
    /* End Components */

    .container {
      padding-left: 15px;
      padding-right: 15px;
      margin-left: auto;
      margin-right: auto;
    }
    .testimonials {
      padding-top: 100px;
      padding-bottom: 100px;
      background-color: #EFEFEF;
    }
    .testimonials .content {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
    @media (max-width: 961px) {
      .testimonials .content {
        flex-direction: column;
      } 
    }
    .testimonial {
      flex: 0 1 auto;
      height: fit-content;
      width: 32%;
      text-align: center;
      line-height: 2;
      color: #777;
    }
    .testimonial figure > * {
      margin-bottom: 16px;
    }
    .testimonial figure img {
      border-radius: 50%;
    }

    @media (max-width: 961px) {
      .testimonial {
        width: 100%;
        margin-bottom: 16px;
      }
    }
  `;

  static properties = {
    customers: {
      type: Array
    },
  }

  constructor() {
    super();
    this.customers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchCustomers();
  }

  fetchCustomers() {
    fetch('https://randomuser.me/api/?results=3')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        this.handleResponse(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleResponse(response) {
    if (response) {
      const quotes = [
        'Lorem ipsum dolor sit amet vero. Ex in clita dolor laoreet. Ut velit invidunt diam sed dolore blandit amet gubergren.',
        'Erat dolore qui sed elit sit sed nulla gubergren volutpat ipsum. Suscipit ut ea nonumy consequat esse et sed.',
        'Et accusam est kasd consetetur sit voluptua duo. Sed nam ut et vero et vero sit blandit. Dolore sed takimata.'
      ];
      const companies = ['Apple', 'Google', 'Tesla'];
      this.customers = response.results;
      this.customers.forEach((customer, index) => {
        customer.quote = quotes[index];
        customer.company = String(companies[index]);
        customer.url = `https://www.${(customer.company).toLowerCase()}.com`;
      })
    }
  }

  render() {
    return html`
      <div id="testimonials" class="testimonials">
        <div class="container">
          <div class="main-heading">
            <h2>Testimonials</h2>
            <p>
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
              tincidunt.
            </p>
          </div>
          <div class="content">
            ${this.customers.map((customer) => html`
              <div class="testimonial">
                <figure>
                  <img src=${ customer.picture.medium } alt=${ customer.name.first } ${ customer.name.last }>
                  <blockquote cite=${ customer.url }>
                    <p>${ customer.quote }</p>
                  </blockquote>
                  <figcaption>${ customer.name.first } ${ customer.name.last }, <cite>${ customer.company }</cite></figcaption>
                </figure>
              </div>
            `)};
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('kasper-testimonials', KasperTestimonials);
