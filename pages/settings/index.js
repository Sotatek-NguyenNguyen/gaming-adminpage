import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../components/UI/Button.js";
import Input from "../../components/UI/Input.js";
import Layout from "../../components/Layouts/Layout";
import { getJSON } from "../../common.js";
import { ADMIN_PAGE_BACKEND_URL } from "../../config";

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

  const [disabledEditGameInfo, setDisabledEditGameInfo] = useState(true);
  const [editorInitValue, setEditorInitValue] = useState("");

  const getGameInfo = async () => {
    try {
      const res = await getJSON(`${ADMIN_PAGE_BACKEND_URL}/game-info`);
      const gameInfo = res?.data;

      console.log(gameInfo)

      if (res && res.status === 200) {
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

  const updateGameInfo = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    getGameInfo().catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="container--custom">
      <form className="container--main" onSubmit={(e) => e.preventDefault()}>
        <h3>Game information</h3>
        <div className="game__info">
          <section className="info--left">
            <div className="form__input">
              <label htmlFor="gameName">Game Name:*</label>
              <Input
                type="text"
                ref={nameRef}
                id="gameName"
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameBackground">Game Background:*</label>
              <Input
                type="text"
                ref={backgroundURLRef}
                disabled={disabledEditGameInfo}
                id="gameBackground"
              />
            </div>
          </section>

          <section className="info--right">
            <div className="form__input">
              <label htmlFor="gameLogo">Game Logo Url:*</label>
              <Input
                type="text"
                id="gameLogo"
                ref={logoURLRef}
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameIntro">Game Intro Video Url:*</label>
              <Input
                type="text"
                id="gameIntro"
                ref={videoIntroURLRef}
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameUrl">Game Url:*</label>
              <Input
                type="text"
                id="gameUrl"
                disabled={disabledEditGameInfo}
                ref={gameURLRef}
              />
            </div>
          </section>

          <section className="info__description">
            <label htmlFor="gameDescription">Description:*</label>
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
                  "formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; border-radius: 4px; }",
              }}
            />
          </section>
        </div>

        <div className="game__data">
          <div className="form__input">
            <label htmlFor="webhook">Webhook Endpoint (URL - POST)</label>
            <Input
              id="webhook"
              type="text"
              placeholder="api-webhook"
              ref={webhookRef}
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
              disabled={disabledEditGameInfo}
            />
          </div>
        </div>

        <div className="game__detail">
          <section className="currentCode_and_name">
            <h3>Current code and display name</h3>
            <div className="form__input">
              <label htmlFor="currentCode">Current Code:*</label>
              <Input
                type="text"
                id="currentCode"
                ref={tokenCodeRef}
                disabled={disabledEditGameInfo}
              />
            </div>

            <div className="form__input">
              <label htmlFor="displayName"> Display Name:*</label>
              <Input
                type="text"
                id="displayName"
                ref={tokenNameRef}
                disabled={disabledEditGameInfo}
              />
            </div>
          </section>
          <section className="deposit_and_recharge">
            <h3>Deposit and recharge</h3>
            <div className="form__input">
              <label htmlFor="initialDeposit">Initial Deposit:*</label>
              <Input
                type="text"
                id="initialDeposit"
                value="1.000.000"
                disabled={disabledEditGameInfo}
              />
            </div>

            <div className="form__input">
              <label htmlFor="walletAddress"> Game Wallet Address:*</label>
              <input
                type="text"
                id="walletAddress"
                ref={walletAddressRef}
                disabled={disabledEditGameInfo}
              />
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
