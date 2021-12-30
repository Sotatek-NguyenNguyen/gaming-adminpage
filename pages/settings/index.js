import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../components/UI/Button.js";
import Input from "../../components/UI/Input.js";
import Layout from "../../components/Layouts/Layout";
import { getJSON } from "../../common.js";
import { ADMIN_PAGE_BACKEND_URL } from "../../config";

function SettingsPage() {
  const editorRef = useRef(null);
  const inputFileRef = useRef(null);
  const nameFile = useRef(null);
  const [disabledEditGameInfo, setDisabledEditGameInfo] = useState(true);
  const [gameInfo, setGameInfo] = useState();

  const getGameInfo = async () => {
    try {
      const res = await getJSON(`${ADMIN_PAGE_BACKEND_URL}/game-info`);
      console.log(res.data);
      if (res.status === 200) setGameInfo(res?.data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getGameInfo().catch((err) => console.error(err.message));
  }, []);
  return (
    <div className="container--custom">
      <form className="container--main" onSubmit={e => e.preventDefault()}>
        <h3>Game information</h3>
        <div className="game__info">
          <section className="info--left">
            <div className="form__input">
              <label htmlFor="gameName">Game Name:*</label>
              <Input
                value={gameInfo?.name}
                type="text"
                id="gameName"
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameBackground">Game Background:*</label>
              <Input
                value={gameInfo?.backgroundURL}
                type="text"
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
                value={gameInfo?.logoURL}
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameIntro">Game Intro Video Url:*</label>
              <Input
                type="text"
                id="gameIntro"
                value={gameInfo?.videoIntroURL}
                disabled={disabledEditGameInfo}
              />
            </div>
            <div className="form__input">
              <label htmlFor="gameUrl">Game Url:*</label>
              <Input
                type="text"
                id="gameUrl"
                disabled={disabledEditGameInfo}
                value={gameInfo?.gameURL}
              />
            </div>
          </section>

          <section className="info__description">
            <label htmlFor="gameDescription">Description:*</label>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={gameInfo?.description}
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

        <div className="game__detail">
          <section className="currentCode_and_name">
            <h3>Current code and display name</h3>
            <div className="form__input">
              <label htmlFor="currentCode">Current Code:*</label>
              <Input
                type="text"
                id="currentCode"
                value={gameInfo?.tokenCode}
                disabled={disabledEditGameInfo}
              />
            </div>

            <div className="form__input">
              <label htmlFor="displayName"> Display Name:*</label>
              <Input
                type="text"
                id="displayName"
                value={gameInfo?.tokenName}
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
                value={gameInfo?.walletAddress}
                disabled={disabledEditGameInfo}
              />
            </div>
          </section>
        </div>
        {disabledEditGameInfo && (
          <Button variant="contained" onClick={() => setDisabledEditGameInfo(false)} className="btn-main edit_game_info">
            Edit
          </Button>
        )}

         {!disabledEditGameInfo && (
           <Button className="btn-main edit_game_info">
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
