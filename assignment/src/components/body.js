
function Body() {
    return (
        <div className="body">
            <div className="landing" id="home">
              <div className="landing-background">
                  <div className="landing-content">
                    <h1>TODOKAGE'S THRIFTS</h1>
                  
                  </div>
              </div>

            </div>
            <h1 className="productT" id="products">Our Products</h1>
            <div className="product-background" >
            
                    <div className="product">
                        <div className="product-content">
                        
                            <div className="product-pic-1">
                            
                            </div>
                           
                            
                            
                        </div>
                       
                        
                    </div>
                    <div className="product">
                        <div className="product-content">
                        
                           <div className="product-pic-2" onClick={() => window.location.href = "https://www.todokages.com/products/"}>
                                
                            </div> 
                        </div>
                        
                    </div>
                    <div className="product">
                        <div className="product-content">
                        
                        <div className="product-pic-3">
                                
                                </div> 
                        </div>
                        
                    </div>
                    <div className="product">
                        <div className="product-content">
                          
                        <div className="product-pic-4">
                        
                                </div> 
                        </div>
                        
                    </div>
                

            </div>
            <h1 className="gallery"id="Gallery">Gallery</h1>
            <div className="gallery-background" >
                
                <div className="picture-1">

                </div>
                <div className="picture-2">

                </div>
                <div className="picture-3">

                </div>
                <div className="picture-4">

                </div>

            </div>
            
            
            <div className="about" id="about">
              <div className="about-background">
                  <div className="about-content">
                    <h1>ABOUT US</h1>
                    <p>
                        A thrift store for all your needs. We have a wide variety of clothing products. 
                        Our mission is to provide affordable and sustainable shopping options for everyone. 
                        We believe in the power of second-hand shopping to reduce waste and promote a circular economy. 
                        Join us in our mission to make the world a better place, one thrift at a time.
                     </p>
                  </div>
              </div>
             
          
            
          </div>
          <h1 className="contact-background">Contact Us</h1>
          <div className="gallery-background" >
                
                <div className="contact">
                <form>
        <div className="info">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" required></input>
        </div>
        <div className="info">
          <label for="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" required></input>
        </div>
        <div className="info">
          <label for="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

                </div>
                
                <div className="contact-pic">

                </div>

            </div>
            </div>
                
        
    );
}
export default Body;