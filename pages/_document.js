import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head> 
               <link rel="shortcut icon" href="icons/favicon-32x32.png" />
            </Head>
            <body>
               <div id='modal-root' /> 
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}