import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';
import Layout from "../../components/Layouts/Layout";


function SettingsPage() {
  const editorRef = useRef(null);
  return (
    <div className="container--custom">
      <form className="container--main">
        <h3>Game information</h3>
        <div className='game__info'>
          <section className="info--left">
            <div className='form__input'>
              <label htmlFor='gameName'>Game Name:*</label>
              <input type='text' id='gameName' />
            </div>
            <div className='form__input'>
              <label htmlFor='gameBackground'>Game Background:*</label>
              <label htmlFor='gameBackground' className="custom-file-upload">
                <input type="file" id='gameBackground' name='gameBackground'/>
                Choose file
              </label>
              <span >No file Chosen</span>  
            </div>
          </section>
          <section className="info--right">
            <div className='form__input'>
              <label htmlFor='gameLogo'>Game Logo Url:*</label>
              <input type='text' id='gameLogo' />
            </div>
            <div className='form__input'>
              <label htmlFor='gameIntro'>Game Intro Video Url:*</label>
              <input type='text' id='gameIntro' />
            </div>
            <div className='form__input'>
              <label htmlFor='gameUrl'>Game Url:*</label>
              <input type='text' id='gameUrl' />
            </div>
          </section>
          
          <section className='info__description'>
            <label htmlFor='gameDescription'>Description:*</label>
            <Editor
              onInit={(evt, editor) => editorRef.current = editor}
              init={{
                height: 200,
                menubar: false,
                statusbar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify' ,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; border-radius: 4px; }'
              }}
            />
          </section>
        </div>

        <div className='game__detail'>
          <section className='currentCode_and_name'>
            <h3>Current code and display name</h3>
            <div className='form__input'>
             <label htmlFor='currentCode'>Current Code:*</label>
             <input type='text' id='currentCode' value='GM' disabled/>
            </div>

            <div className='form__input'>
              <label htmlFor='displayName'> Display Name:*</label>
              <input type='text' id='displayName' value='Crystal' disabled/>
            </div>
          </section>
          <section className='deposit_and_recharge'>
            <h3>Deposit and recharge</h3>
            <div className='form__input'>
             <label htmlFor='initialDeposit'>Initial Deposit:*</label>
             <input type='text' id='initialDeposit' value='1.000.000' disabled/>
            </div>

            <div className='form__input'>
              <label htmlFor='walletAddress'> Game Wallet Address:*</label>
              <input type='text' id='walletAddress' value='' disabled/>
            </div>
          </section>
        </div>

        <Button variant="contained" className='btn-main edit_game_info'>Edit</Button>
      </form> 
    </div>
  )
}

export default SettingsPage

SettingsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
  