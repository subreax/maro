<script>
    import { onMount, tick } from "svelte";
    import { Backend } from "../backend";

    let companyCreated = Backend.hasGroupId();

    let qrComponent;
    

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

        Backend.createGroup()
            .then(async res => {
                const json = await res.json();
                if (res.ok) {
                    console.log(json);
                    Backend.saveGroupId(json.groupId);
                    companyCreated = true;
                    
                    setQrImage(json.qrLink);
                }
                else {
                    console.error(json);
                }
            });
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
        <div class="vspace" />
        <button on:click|preventDefault={createCompany}>Создать компанию</button>
    {:else}
        <p>Компания создана. Чтобы присоединиться к компании, участники должны отсканировать этот QR-код:</p>
        
        //скорее всего бред
        <div bind:this={qrComponent} class="qr" on:click|preventDefault={() => navigate(Nav.JOIN_GROUP, { replace: true })}/>
        <button on:click={() => deleteCompany()}>Удалить компанию</button>
    {/if}
{:else}
    <p>Чтобы создать компанию, нужно авторизоваться.</p>
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
