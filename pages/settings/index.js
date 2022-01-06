import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../components/UI/Button.js";
import Input from "../../components/UI/Input.js";
import Layout from "../../components/Layouts/Layout";
import { getJSON, updateJSON } from "../../common.js";
import { useAuth } from "../../hooks";
import { useRouter } from "next/router";
import {useAlert} from "../../hooks/useAlert";

function SettingsPage() {
  const editorRef = useRef(null);
  const nameRef = useRef(null);
  const backgroundURLRef = useRef(null);
  const logoURLRef = useRef(null);
  const videoIntroURLRef = useRef(null);
  const gameURLRef = useRef(null);
  const tokenCodeRef = useRef(null);
  const tokenNameRef = useRef(null);
  const walletAddressRef = useRef(null);
  const webhookRef = useRef(null);
  const itemInfoRef = useRef(null);
  
  const { isLoggined } = useAuth();
  const router = useRouter();

  const [disabledEditGameInfo, setDisabledEditGameInfo] = useState(true);
  const [editorInitValue, setEditorInitValue] = useState("");

  const {alertSuccess, alertError} = useAlert();

  const getGameInfo = async () => {
    try {
      const gameInfo = await getJSON(`/admin/game-info`);

      if (gameInfo) {
        nameRef.current.value = gameInfo?.name;
        backgroundURLRef.current.value = gameInfo?.backgroundURL;
        logoURLRef.current.value = gameInfo?.logoURL;
        setEditorInitValue(gameInfo?.description);
        videoIntroURLRef.current.value = gameInfo?.videoIntroURL;
        gameURLRef.current.value = gameInfo?.gameURL;
        tokenCodeRef.current.value = gameInfo?.tokenCode;
        tokenNameRef.current.value = gameInfo?.tokenName;
        walletAddressRef.current.value = gameInfo?.walletAddress;
        webhookRef.current.value = gameInfo?.webhookUrl;
        itemInfoRef.current.value = gameInfo?.getItemUrl;
      }
    } catch (err) {
      throw err;
    }
  };

  const updateGameInfo = async () => {
    const updatedGameInfoData = {
      name: nameRef.current.value,
      videoIntroURL: videoIntroURLRef.current.value,
      logoURL: logoURLRef.current.value,
      backgroundURL: backgroundURLRef.current.value,
      description: (editorRef.current && editorRef.current.getContent()),
      gameURL: gameURLRef.current.value,
      webhookUrl: webhookRef.current.value,
      getItemUrl: itemInfoRef.current.value,
      tokenCode: tokenCodeRef.current.value,
      tokenNameRef: tokenNameRef.current.value,
      walletAddressRef: walletAddressRef.current.value
    }
    
    try {
      const res = await updateJSON(`/admin/game-info`, updatedGameInfoData);
      alertSuccess('Game info updated successfully!')
      setDisabledEditGameInfo(true)
    } catch (err) {
      alertError(err.message)
    }
  };

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  useEffect(() => {
    getGameInfo().catch((err) => alertError(err.message));
  }, []);

  const styleTextDisable = {
    color: disabledEditGameInfo ? '#9F99B3' : 'black'
  }
  const styleTextEditorDisable = disabledEditGameInfo ? '#9F99B3' : 'black';

  return (
    <div className="container--custom">
      <form className="container--main" onSubmit={(e) => e.preventDefault()}>
        <div className="card-custom">
          <h3 className="card__title">Game information</h3>
          <div className="game__info card__body">
            <section className="info--left">
              <div className="form__input">
                <label htmlFor="gameName">Game Name: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  ref={nameRef}
                  className="input-main large"
                  id="gameName"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameBackground">Game Background: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  ref={backgroundURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  id="gameBackground"
                />
              </div>
            </section>

            <section className="info--right">
              <div className="form__input">
                <label htmlFor="gameLogo">Game Logo Url: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="gameLogo"
                  ref={logoURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameIntro">Game Intro Video Url: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="gameIntro"
                  ref={videoIntroURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameUrl">Game Url: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="gameUrl"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  className="input-main large"
                  ref={gameURLRef}
                />
              </div>
            </section>

            <section className="info__description">
              <label htmlFor="gameDescription">Description: <span className="label-required">*</span></label>
              <Editor
                initialValue={editorInitValue}
                onInit={(evt, editor) => (editorRef.current = editor)}
                disabled={disabledEditGameInfo}
                init={{
                  height: 200,
                  menubar: false,
                  statusbar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "formatselect | bold italic | alignleft aligncenter alignright alignjustify",
                  content_style:
                    `body { font-size: 14pt; font-family: Arial; color: ${styleTextEditorDisable} !important}`,
                }}
              />
            </section>
          </div>
        </div>
        
        <div className="card-custom">
          <h3 className="card__title">DATA</h3>
          <div className="game__data card__body">
            <div className="form__input">
              <label htmlFor="webhook">Webhook Endpoint (URL - POST)</label>
              <Input
                id="webhook"
                type="text"
                placeholder="api-webhook"
                ref={webhookRef}
                className="input-main large"
                style={styleTextDisable}
                disabled={disabledEditGameInfo}
              />
            </div>

            <div className="form__input">
              <label htmlFor="item-info">Item Info API (URL - POST)</label>
              <Input
                id="item-info"
                placeholder="api-get-sth"
                type="text"
                ref={itemInfoRef}
                className="input-main large"
                style={styleTextDisable}
                disabled={disabledEditGameInfo}
              />
            </div>
          </div>
        </div>

        <div className="game__detail">
          <section className="card-custom currentCode_and_name">
            <h3 className="card__title">Current code and display name</h3>
            <div className="card__body">
              <div className="form__input">
                <label htmlFor="currentCode">Current Code: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="currentCode"
                  ref={tokenCodeRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>

              <div className="form__input">
                <label htmlFor="displayName"> Display Name: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="displayName"
                  ref={tokenNameRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>
            </div>
              
          </section>
          <section className="card-custom deposit_and_recharge">
            <h3 className="card__title">Deposit and recharge</h3>
            <div className="card__body">
              <div className="form__input">
                <label htmlFor="initialDeposit">Initial Deposit: <span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="initialDeposit"
                  value="1.000.000"
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>

              <div className="form__input">
                <label htmlFor="walletAddress"> Game Wallet Address:<span className="label-required">*</span></label>
                <Input
                  type="text"
                  id="walletAddress"
                  ref={walletAddressRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                />
              </div>
            </div>
          </section>
        </div>
        {disabledEditGameInfo && (
          <Button
            variant="contained"
            onClick={() => setDisabledEditGameInfo(false)}
            className="btn-main edit_game_info"
          >
            Edit
          </Button>
        )}

        {!disabledEditGameInfo && (
          <Button onClick={updateGameInfo} className="btn-main edit_game_info">
            Save
          </Button>
        )}
      </form>
    </div>
  );
}

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
