<script>
    import { Backend } from "../backend";

    let companyCreated = false;

    function createCompany() {
        companyCreated = true;
    }

    function deleteCompany() {
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

    <div class="qr" />

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
