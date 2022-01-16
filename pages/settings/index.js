import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../components/UI/Button.js";
import Input from "../../components/UI/Input.js";
import Layout from "../../components/Layouts/Layout";
import { getJSON, updateJSON } from "../../common.js";
import { useAuth } from "../../hooks";
import { useRouter } from "next/router";
import { useAlert } from "../../hooks/useAlert";
import { validateURL } from "../../shared/helper";

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
  const topElRef = useRef(null);

  const { isLoggined } = useAuth();
  const router = useRouter();

  const [disabledEditGameInfo, setDisabledEditGameInfo] = useState(true);
  const [editorInitValue, setEditorInitValue] = useState("");
  const [errors, setErrors] = useState(null);

  const { alertSuccess, alertError } = useAlert();

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

  const removeErrors = (field, _errors) => {
    if(!_errors[field]) return;
    _errors[field] = null;
  }

  const checkFieldIsEmpty = (value, prefix, _errors) => {
    if(value.trim() === ''){
      _errors[prefix] = `This field is required`;
      return false;
    }
    return true;
  }

  const checkFieldUpdate = () => {
    const updatedGameInfoData = {
      name: nameRef.current.value,
      videoIntroURL: videoIntroURLRef.current.value,
      logoURL: logoURLRef.current.value,
      backgroundURL: backgroundURLRef.current.value,
      description: editorRef.current && editorRef.current.getContent(),
      gameURL: gameURLRef.current.value,
      webhookUrl: webhookRef.current.value,
      getItemUrl: itemInfoRef.current.value,
      tokenCode: tokenCodeRef.current.value,
      tokenNameRef: tokenNameRef.current.value,
      walletAddressRef: walletAddressRef.current.value,
    };

    let _errors = {...errors};
    let gameName = checkFieldIsEmpty(updatedGameInfoData.name, 'GameName', _errors);
    if(gameName) removeErrors('GameName', _errors);

    let description = checkFieldIsEmpty(updatedGameInfoData.description, 'description', _errors);
    if(description) removeErrors('description', _errors);

    let logoURL = validateURL(updatedGameInfoData.logoURL, true, (link) => {
      if(!checkFieldIsEmpty(link, 'logoURL', _errors)) return;
      _errors['logoURL'] = `This field must be a valid image URL`;
    });
    if(logoURL) removeErrors('logoURL', _errors);

    let backgroundURL = validateURL(updatedGameInfoData.backgroundURL, true, (link) => {
      if(!checkFieldIsEmpty(link, 'backgroundURL', _errors)) return;
      _errors['backgroundURL'] = `This field must be a valid image URL`;
    });
    if(backgroundURL) removeErrors('backgroundURL', _errors);

    let videoIntroURL = validateURL(updatedGameInfoData.videoIntroURL, false, (link) => {
      if(!checkFieldIsEmpty(link, 'videoIntroURL', _errors)) return;
      _errors['videoIntroURL'] = `This field must be a valid URL`;
    });
    if(videoIntroURL) removeErrors('videoIntroURL', _errors);

    let gameURL = validateURL(updatedGameInfoData.gameURL, false, (link) => {
      if(!checkFieldIsEmpty(link, 'gameURL', _errors)) return;
      _errors['gameURL'] = `This field must be a valid URL`;
    });
    if(gameURL) removeErrors('gameURL', _errors);

    let webhookUrl = validateURL(updatedGameInfoData.webhookUrl, false, (link) => {
      if(!checkFieldIsEmpty(link, 'webhookUrl', _errors)) return;
      _errors['webhookUrl'] = `This field must be a valid URL`;
    });
    if(webhookUrl) removeErrors('webhookUrl', _errors);

    let getItemUrl = validateURL(updatedGameInfoData.getItemUrl, false, (link) => {
      if(!checkFieldIsEmpty(link, 'getItemUrl', _errors)) return;
      _errors['getItemUrl'] = `This field must be a valid URL`;
    });
    if(getItemUrl) removeErrors('getItemUrl', _errors);

    if(
      !gameName ||
      !description ||
      !logoURL ||
      !backgroundURL ||
      !videoIntroURL ||
      !gameURL ||
      !webhookUrl ||
      !getItemUrl 
    ) {
      setErrors(_errors);
      topElRef.current.scrollIntoView();
      return false;
    };

    return updatedGameInfoData;
  }

  const styleTextDisable = {
    color: disabledEditGameInfo ? "#9F99B3" : "black",
  };
  const styleTextEditorDisable = !disabledEditGameInfo ? "#9F99B3" : "black";

  const changeColorEditor = () => {
    let styleEditor = `
      body { 
        font-size: 14pt; 
        font-family: Arial; 
        color: ${styleTextEditorDisable} !important;
        border-color: red;
      }
    `;
    editorRef.current.iframeElement.contentDocument.getElementsByTagName('style')[0].innerHTML = styleEditor;
  }

  const updateGameInfo = async () => {
    const updatedGameInfoData = checkFieldUpdate();
    if(!updatedGameInfoData) return;
    try {
      const res = await updateJSON(`/admin/game-info`, updatedGameInfoData);

      if (res.statusCode === 400 && !res.success) return;

      alertSuccess("Changes saved");
      setErrors(null);
      setDisabledEditGameInfo(true);
      changeColorEditor();
    } catch (err) {
      // alertError(err.message);
    }
  };

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/");
  }, []);

  useEffect(() => {
    getGameInfo().catch((err) => alertError(err.message));
  }, []);

  return (
    <div className="container--custom" ref={topElRef}>
      <form className="container--main" onSubmit={(e) => e.preventDefault()}>
        <div className="card-custom">
          <h3 className="card__title">Game information</h3>
          <div className="game__info card__body">
            <section className="info--left">
              <div className="form__input">
                <label htmlFor="gameName">
                  Game Name: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  ref={nameRef}
                  className="input-main large"
                  id="gameName"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  error={errors?.GameName}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameBackground">
                  Game Background: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  ref={backgroundURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  id="gameBackground"
                  error={errors?.backgroundURL}
                />
              </div>
            </section>

            <section className="info--right">
              <div className="form__input">
                <label htmlFor="gameLogo">
                  Game Logo URL: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="gameLogo"
                  ref={logoURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  error={errors?.logoURL}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameIntro">
                  Game Intro Video URL:{" "}
                  <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="gameIntro"
                  ref={videoIntroURLRef}
                  className="input-main large"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  error={errors?.videoIntroURL}
                />
              </div>
              <div className="form__input">
                <label htmlFor="gameUrl">
                  Game URL: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="gameUrl"
                  style={styleTextDisable}
                  disabled={disabledEditGameInfo}
                  className="input-main large"
                  ref={gameURLRef}
                  error={errors?.gameURL}
                />
              </div>
            </section>

            <section className={`info__description ${(errors?.description) ? 'tiny-custom-err' : ''}`}>
              <label htmlFor="gameDescription">
                Description: <span className="label-required">*</span>
              </label>
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
                  content_style: `body { font-size: 14pt; font-family: Arial; color: #9F99B3 !important}`,
                }}
              />
              {errors?.description && <span className="text-error">This field is required</span>}
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
                error={errors?.webhookUrl}
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
                error={errors?.getItemUrl}
              />
            </div>
          </div>
        </div>

        <div className="game__detail">
          <section className="card-custom currentCode_and_name">
            <h3 className="card__title">Current code and display name</h3>
            <div className="card__body">
              <div className="form__input">
                <label htmlFor="currentCode">
                  Current Code: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="currentCode"
                  ref={tokenCodeRef}
                  className="input-main large"
                  style={{color: '#9F99B3'}}
                  disabled={true}
                />
              </div>

              <div className="form__input">
                <label htmlFor="displayName">
                  {" "}
                  Display Name: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="displayName"
                  ref={tokenNameRef}
                  className="input-main large"
                  disabled={true}
                  style={{color: '#9F99B3'}}
                />
              </div>
            </div>
          </section>
          <section className="card-custom deposit_and_recharge">
            <h3 className="card__title">Deposit and recharge</h3>
            <div className="card__body">
              <div className="form__input">
                <label htmlFor="initialDeposit">
                  Initial Deposit: <span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="initialDeposit"
                  value="0.000.000"
                  className="input-main large"
                  disabled={true}
                  style={{color: '#9F99B3'}}
                />
              </div>

              <div className="form__input">
                <label htmlFor="walletAddress">
                  {" "}
                  Game Wallet Address:<span className="label-required">*</span>
                </label>
                <Input
                  type="text"
                  id="walletAddress"
                  ref={walletAddressRef}
                  className="input-main large"
                  disabled={true}
                  style={{color: '#9F99B3'}}
                />
              </div>
            </div>
          </section>
        </div>
        {disabledEditGameInfo && (
          <Button
            variant="contained"
            onClick={() => {setDisabledEditGameInfo(false); changeColorEditor()}}
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
