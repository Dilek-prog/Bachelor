import "./index.css";
import Container from "react-bootstrap/esm/Container";


export default function ImpressPage({ }) {
  
    return (
            <>
            <Container className="main1">
                <div id="Info">
                  <section className="ueberschrifth1">
                    <h1><u>Impressum</u></h1>
                  </section>
                </div>
              <section className="impressum">
                  <p>Dilek Ogur</p>
                  <p>Köpenicker straße: 101</p>
                  <p>10179 Berlin</p>
                  <p>DilekOgur2253@gmail.com</p>
              </section> 
            </Container>
          </>
          );
    }