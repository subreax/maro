<script>
    import { Backend } from "../backend";

    let companyCreated = false;

    function createCompany() {
        if(!companyCreated) {
            Backend.createGroup()
            .then(async (response) => {
                let qr = document.getElementById('qr');
                let res = await response.json();
                companyCreated = true;
                qr.style.backgroundImage = res.qrLink;
            });
        }
    }

    function deleteCompany() {
        if(companyCreated) {
            Backend.deleteGroup()
        }
        companyCreated = false;
    }
</script>

{#if !companyCreated}
    {#if Backend.isSignedIn()}


    <p>
        Создайте компанию, с которой вы собираетесь пойти на прогулку, или
        присоединитесь к уже существующей.
    </p>

    <div class="vspace" />

    <button on:click={() => createCompany()}> Создать компанию </button>
    {:else}
    <p>Чтобы создать компанию, нужно авторизоваться.</p>
    {/if}
{:else}
    <p>
        Компания создана. Чтобы присоединиться к компании, участники должны
        отсканировать этот QR-код:
    </p>

    <div class="qr" id = "qr"/>

    <button on:click={() => deleteCompany()}>Удалить компанию</button>
{/if}


<style>
    .vspace {
        height: 10px;
    }

    .qr {
        width: 150px;
        height: 150px;
        background: #424242;
        border-radius: 10px;
        margin: 10px auto;
    }
</style>
