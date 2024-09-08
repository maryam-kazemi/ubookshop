import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';



export default p => Component(p, Page);
const Page: PageEl = (props, state:

  {
    form: string,
    book: {
      title: string, author: string, country: string,
      imageLink: string, price: number,
      language: string, pages: number,

    },
    cart: Array<string>,
    faves: Array<string>
  }, refresh, getProps) => {

  let styles = global.styles

  let total_price= 0

  if(!state.cart){
    state.cart = []
  }


if(!state.faves){
    state.faves = []
  }

  for(let title of state.cart){
    let book = props.books.find(b=> b.title == title)
    if (book) {
      total_price += (book.price*0.75)
    }
  }





  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspecs" ? <WindowFloat
        title="books information" onclose={() => {
          delete state.form
          refresh()
        }}>


        <f-cc>
          <f-15>writer:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-cc>

        <f-cc>
          <f-15> country:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-cc>

        <f-cc>
          <f-15>language:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-cc>

        <f-cc>
          <f-15>pages:</f-15>
          <sp-2 />
          <f-15>{(state.book.pages as number)}</f-15>
        </f-cc>

        <g-b style={{
          backgroundColor:
            state.cart.includes(state.book.title) ? "#B804046F" : " #9AC1ACC7"
        }} onClick={async () => {

          if (state.cart.includes(state.book .title))
          {
            state.cart = state.cart.filter(bookname=> state.book.title != bookname)
            state.form = null
          refresh()
          await api("/api/test", state.cart)

          }
          else{
            state.cart.push(state.book.title)
          state.form = null
          refresh()
          
          }


        }}>
          {state.cart.includes(state.book.title) ?  <f-14 > Remove</f-14> :  <f-13>Add to cart</f-13>} 
        </g-b>

        <br-x/>

        <g-b style={{backgroundColor: "#FDFFFEAB"}} onClick={()=>{
          if(state.faves.includes(state.book.title))
            {
              state.faves = state.faves.filter(bookname=> state.book.title != bookname)
              state.form = null
          refresh()
            }
            else
            {
            state.faves.push(state.book.title)
            state.form = null
            refresh()
            }
          
        }}>
          {state.faves.includes(state.book.title)?<f-14> <img src="https://cdn.ituring.ir/research/25/%21heart.png" style={{height:32, marginTop:"8px" }}/></f-14> : <f-14> <img src="https://cdn.ituring.ir/research/25/b.fave.png" style={{height:32, marginTop:"8px", objectFit:"contain"}}/></f-14> }
          {/* <img src={state.cart.includes(state.book.title) ? */}
            {/* "https://cdn.ituring.ir/research/25/iconsfavorite.png" : */}
            {/* "https://cdn.ituring.ir/research/25/icons8-favorite.png"} style={{ width: 25, height:25 , objectFit: "contain", margin: "5px 10px" }}></img> */}
            

        </g-b >



      </WindowFloat> : null}


      <Window title="Your cart"  style={{margin: 10, width: "calc(100% - 20px)"}}>
        <f-cse style={{width:"100%", height:75}}>

        <f-cse style={{ height:60 , width: 300, borderRadius: 10, backgroundColor: "#F7F7F77E", margin: "10px"}}>



        <img src ="https://cdn.ituring.ir/research/25/book.png"    style={{width:55, height:55, objectFit:"contain"}}>
        
        </img>

        {state.cart.length >1 ?<f-17 style={{fontFamily:"seriff"}}> You have {state.cart.length} items in your cart</f-17>: <f-17  style={{fontFamily:"seriff"}}>You have {state.cart.length} item in your cart</f-17> }

        </f-cse>


        
          {/* {state.cart.length >1 ?<f-17 style={{fontFamily:"seriff"}}> You have {state.cart.length} items in your cart</f-17>: <f-17  style={{fontFamily:"seriff"}}>You have {state.cart.length} item in your cart</f-17> } */}

          <f-cse style={{ height:60 , width: 300, borderRadius: 10, backgroundColor: "#F7F7F77E", margin: "10px"}}>


          <img src ="https://cdn.ituring.ir/research/25/payment.png"  style={{width:52, height:52, objectFit:"contain", marginTop:6}}></img>
        

          <f-17 style={{fontFamily:"seriff"}}>Total price:<sp-3/>{total_price}</f-17>

          </f-cse>

          

          
        </f-cse>
      </Window>


      <Window title={"welcome"}
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre>
         */}

        <w-cse style={{}}>
          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh}
            />
          })}
        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {

  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()

  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }

  console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}
