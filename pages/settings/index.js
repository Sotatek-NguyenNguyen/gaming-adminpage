import React from 'react';
import Layout from "../../components/Layouts/Layout";


function SettingsPage() {
    return (
        <div>
            Settings Page  
        </div>
    )
}

export default SettingsPage

SettingsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
  