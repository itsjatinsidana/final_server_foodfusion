const Banner = () => {
    return (
        <>
            <div id="wrapper" className="banner-wrapper1">
                {/* hero-wrap*/}
                <div className="hero-wrap fl-wrap full-height" data-scrollax-parent="true">
                    {/*multi-slideshow-wrap_1 */}
                    <div
                        className="multi-slideshow-wrap_fs"
                        data-scrollax="properties: { translateY: '30%' }"
                    >
                        <div className="full-height fl-wrap">
                            {/*ms-container*/}
                            <div className="multi-slideshow_fs ms-container fl-wrap full-height">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        {/*ms_item*/}
                                        <div className="swiper-slide">
                                            <div className="ms-item_fs fl-wrap">
                                                {/* <div className="" data-bg="images/bg/19.jpg" /> */}
                                                <img src="images/bg/1.jpg" alt="img" id="banner-img" />
                                                <div className="overlay" />
                                            </div>
                                        </div>




                                        {/*ms_item end*/}
                                    </div>
                                </div>
                            </div>
                            {/*ms-container end*/}
                        </div>
                        <div className="hiddec-anim" />
                    </div>
                    {/*multi-slideshow-wrap_1 end*/}
                    <div className="hero-title-wrap fl-wrap">
                        <div className="container">
                            <div className="hero-title">
                                <h4>Top Services and Premium Cuisine </h4>
                                <h2>Welcome <br />
                                    <span style={{ marginLeft: "70px" }}> To</span> <br />
                                    FoodFusion</h2>
                                {/* <a href="/userviewmenu" className="hero_btn">
            Check out our Menu <i className="fal fa-long-arrow-right" />
          </a> */}
                            </div>
                        </div>
                    </div>
                    {/*hero_promo-wrap*/}

                    {/*hero_promo-wrap end*/}

                    {/*hero-social end*/}
                    {/* hero-bottom-container */}
                    <div className="hero-bottom-container">
                        <div className="container">
                            <div className="scroll-down-wrap">
                                <div className="mousey">
                                    <div className="scroller" />
                                </div>
                                <span>Scroll down to Discover</span>
                            </div>
                            <a href="#sec2" className="sd_btn custom-scroll-link">
                                <i className="fal fa-chevron-double-down" />
                            </a>
                        </div>
                    </div>
                    {/* hero-bottom-container */}
                    <div className="hero-dec_top" />
                    <div className="hero-dec_bottom" />
                    <div className="brush-dec" />
                </div>
                {/* hero-wrap  end */}
                {/* content  */}
                <div className="content" id="content-banner">
                    <section
                        className="hidden-section big-padding"
                        data-scrollax-parent="true"
                        id="sec2"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="section-title text-align_left">
                                        <h4>Our story</h4>
                                        <h2>Few words about us</h2>
                                        <div className="dots-separator fl-wrap">
                                            <span />
                                        </div>
                                    </div>
                                    <div className="text-block ">
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium totam aperiam. Eaque ipsa quae
                                            ab illo inventore veritatis et quasi architecto beatae vitae
                                            dicta sunt. Ut enim ad minima veniam, quis nostrum
                                            exercitationem ullam corporis suscipit laboriosam, nisi ut
                                            aliquid ex ea commodi consequatur.
                                        </p>
                                        <p>
                                            {" "}
                                            Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                                            esse quam nihil molestiae consequatur.
                                        </p>
                                        <a href="#food-category" className="btn fl-btn">
                                            Explore Our Menu
                                            <i className="fal fa-long-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image-collge-wrap fl-wrap">
                                        <div className="main-iamge">
                                            <img src="images/all/3.jpg" alt="" />
                                        </div>

                                        <div
                                            className=""
                                            style={{ width: 120 }}
                                            data-position-left={-23}
                                            data-position-top={-17}
                                            data-zindex={9}
                                            data-scrollax="properties: { translateY: '150px' }"
                                        >

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-dec sec-dec_top" />
                            <div
                                className="wave-bg"
                                data-scrollax="properties: { translateY: '-150px' }"
                            />
                        </div>
                    </section>





                </div>

            </div>
           

        </>
    )
}
export default Banner;