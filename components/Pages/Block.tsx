
export const Block = props => {




    if (!props.state.cart) {
        props.state.cart = []

    }


       
    if (!props.state.faves) {
        props.state.cart = []

    }


    
    let size = props.state.cart.includes(props.book.title) ? 25 : 45
    let margin = props.state.cart.includes(props.book.title) ? "10px 10px" : "5px 10px"




    return <c-c style={{
        width: 150, flex: 1, minWidth: 150,
        position: "relative", backgroundColor: "white", borderRadius: 5, margin: "10px", boxShadow: "0px 0px 11px 3px rgba(0 0 0 / 0.34)"
    }}>

        <img src={props.state.cart.includes(props.book.title) ?
            "https://irmapserver.ir/research/25/iconsfavorite.png" :
            "https://irmapserver.ir/research/25/icons8-favorite.png"} style={{ width: 25, height:25 , objectFit: "contain", margin: margin, position: "absolute", left:0 }}></img>



        <img
            className={global.styles.hoverzoom_light_nofade}
            src={props.book.imageLink}
            style={{ width: "100%", height: 200, objectFit: "fill", minWidth: 150, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()


            }} />




        <f-cc style={{ width: "100%", padding: "5px 10px", height: 50 }} >
            <f-14 style={{ fontFamily: "lora" }}>{props.book.title}</f-14>
        </f-cc>

        <hr style={{ width: "85%", opacity: 0.5 }} />

        <br-xxx />
        <br-xxx />

        <f-csb style={{ width: "100%", padding: "0 5px" }}>

            <c-x style={{ margin: "0 10px" }}>
                <f-9 style={{ color: "#7272727E" }}>Buy now</f-9>
                <br-xx />
                <f-13b><sp-2 />
                    {0.75 * props.book.price}

                    <sp-2 /></f-13b>
                <f-12 style={{ color: "#8D0606B7" }}><del><sp-2 />{props.book.price}<sp-2 /></del></f-12>

            </c-x>


            <img src={props.state.cart.includes(props.book.title) ?
                "https://irmapserver.ir/qepal/ok.svg" :
                "https://irmapserver.ir/research/25/klipartz.com.png"} style={{ width: size, height: size, objectFit: "contain", margin: margin }}></img>


            {/* {props.state.cart.includes(props.book.title) ? */}
            {/* <f-10> Add to favorite</f-10> : null} */}


        </f-csb>




    </c-c>
}

