<script>
    import { onMount, tick } from "svelte";
    import { Backend } from "../backend";

    let companyCreated = Backend.hasGroupId();

    let qrComponent;

    let isQrLoading = false;

    onMount(() => {
        if (qrComponent && companyCreated) {
            Backend.getGroupDetails()
                .then(async (res) => {
                    const json = await res.json();
                    if (res.ok) {
                        setQrImage(json.qrLink);
                    }
                    else {
                        console.error(json);
                    }
                });
        }
    });


    async function createCompany() {
        if (companyCreated) {
            return;
        }

        companyCreated = true;
        await tick();
        
        console.log(qrComponent);

        isQrLoading = true;

        const result = await Backend.createGroup();
        if (result.ok) {
            isQrLoading = false;
            setQrImage(result.qrLink);
        } 
        else {
            isQrLoading = true;
        }
    }

    function setQrImage(url) {
        qrComponent.style.backgroundImage = `url("${url}")`;
    }

    function deleteCompany() {
        if (companyCreated) {
            Backend.deleteGroup()
                .then(async res => {
                    if (!res.ok) {
                        console.error(await res.json());
                    }
                    else {
                        companyCreated = false;
                    }
                })
            }
    }
</script>


{#if Backend.isSignedIn()}
    {#if !companyCreated}
        <p>Создайте компанию, с которой вы собираетесь пойти на прогулку, или присоединитесь к уже существующей.</p>
        <div class="vspace"></div>
        <button on:click|preventDefault={createCompany}>Создать компанию</button>
    {:else}
        <p>Компания создана. Чтобы присоединиться к компании, участники должны отсканировать этот QR-код:</p>
        <div class="qr-container">
            <div bind:this={qrComponent} class="qr absolute-center" />
            {#if isQrLoading}
                <div class="absolute-center">
                    <i class="fa-solid fa-circle-notch fa-spin"></i>
                </div>
            {/if}
        </div>
        
        <button on:click={() => deleteCompany()}>Удалить компанию</button>
    {/if}
{:else}
    <p>Чтобы создать компанию, нужно авторизоваться.</p>
{/if}


<style>
    .vspace {
        height: 10px;
    }

    .qr-container {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        margin: 10px auto;
    }

    .absolute-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .qr {
        width: 150px;
        height: 150px;
    }

    .qr-container i {
        font-size: 2rem;
        display: block;
        padding: 0;
        margin: 0;
    }
/* 
    .qr i {
        
        font-size: 1rem;
        position: absolute;
        
        transform: translate(-50%, -50%);
    } */

</style>
