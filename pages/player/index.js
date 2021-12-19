import React from 'react'
import Layout from "../../components/Layouts/Layout";

function PlayerPage() {
    return (
        <div>
            Player Page 
        </div>
    )
}

export default PlayerPage

PlayerPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
  