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
    cart: Array<string>

  }, refresh, getProps) => {

  let styles = global.styles

  let total_price= 0

  if(!state.cart){
    state.cart = []
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


        <f-cc >
          <f-15>books name: </f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-cc>

        <f-cc>
          <sp-2 />
          <f-15>price:</f-15>
          <f-15>{state.book.price}</f-15>

        </f-cc>

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
            state.cart.includes(state.book.title) ? "#B804046F" : " #04B855A0"
        }} onClick={() => {

          if (state.cart.includes(state.book .title))
          {
            state.cart = state.cart.filter(bookname=> state.book.title != bookname)
            state.form = null
          refresh()

          }
          else{
            state.cart.push(state.book.title)
          state.form = null
          refresh()
          }


        }}>
          {state.cart.includes(state.book.title) ? <img style= {{width:10, height:10, objectFit:"contain"}}  src ="https://irmapserver.ir/research/25/x-markk.jpg"> <f-13 > 
            Remove</f-13></img> : <f-13>Add to cart</f-13>}
        </g-b>



      </WindowFloat> : null}


      <Window title="Your cart"  style={{margin: 10, width: "calc(100% - 20px)"}}>
        <f-cse style={{width:"100%", height:60}}>
          <f-15 style={{fontFamily:"seriff"}}>Total price:<sp-3/>{total_price}</f-15>
        
          {state.cart.length >1 ?<f-17 style={{fontFamily:"seriff"}}> you have {state.cart.length} items in your cart</f-17>: <f-17  style={{fontFamily:"seriff"}}>you have {state.cart.length} item in your cart</f-17> }

        </f-cse>
      </Window>


      <Window title={"welcom"}
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
    book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
  }

  console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}