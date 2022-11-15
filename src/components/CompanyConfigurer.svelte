<script>
    import { onMount, tick } from "svelte";
    import { Backend, GroupRole } from "../backend";

    let groupRole = Backend.getGroupRole();
    $: companyCreated = groupRole !== GroupRole.NO_ROLE;

    
    let members = []

    let qrComponent;

    let isQrLoading = false;

    onMount(() => {
        if (qrComponent && companyCreated) {
            loadGroupMembers();

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

        groupRole = GroupRole.ADMIN;
        await tick();

        isQrLoading = true;

        const result = await Backend.createGroup();
        if (result.ok) {
            isQrLoading = false;
            setQrImage(result.qrLink);
        } 
        else {
            isQrLoading = true;
        }

        loadGroupMembers();
    }

    function setQrImage(url) {
        qrComponent.style.backgroundImage = `url("${url}")`;
    }

    function deleteCompany() {
        Backend.deleteGroup()
            .then(async res => {
                if (!res.ok) {
                    console.error(await res.json());
                }
                else {
                    groupRole = Backend.getGroupRole();
                    members = [];
                }
            })
    }

    function leaveCompany() {
        
    }

    function loadGroupMembers() {
        Backend.getGroupMembers().then(result => {
            if (result.ok) {
                members = result.members;
            }
        });
    }
</script>


{#if Backend.isSignedIn()}
    {#if groupRole === GroupRole.NO_ROLE}
        <p>Создайте компанию, с которой вы собираетесь пойти на прогулку, или присоединитесь к уже существующей.</p>
        <div class="vspace"></div>
        <button on:click|preventDefault={createCompany}>Создать компанию</button>
    {:else}
        {#if groupRole === GroupRole.ADMIN}
            <p>Компания создана. Чтобы присоединиться к компании, участники должны отсканировать этот QR-код:</p>
            <div class="qr-container">
                <div bind:this={qrComponent} class="qr absolute-center" />
                {#if isQrLoading}
                    <div class="absolute-center">
                        <i class="fa-solid fa-circle-notch fa-spin"></i>
                    </div>
                {/if}
            </div>

            {#if members.length > 0}
                <p>Состав компании:</p>
                <ul>
                    {#each members as member}
                        <li>{member}</li>
                    {/each}
                </ul>
            {/if}

            <button>Купить билеты</button>
            <button on:click|preventDefault={deleteCompany}>Удалить компанию</button>
        {:else if groupRole === GroupRole.MEMBER}
            <p>Вы состоите к группе</p>
            <button on:click|preventDefault={leaveCompany}>Выйти из компании</button>
        {/if}
    {/if}
{:else}
    <p>Чтобы создать компанию, нужно войти</p>
{/if}


<style>
    .vspace {
        height: 10px;
    }

    .qr-container {
        position: relative;
        width: 200px;
        height: 200px;
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
        width: 200px;
        height: 200px;
    }

    .qr-container i {
        font-size: 2rem;
        display: block;
        padding: 0;
        margin: 0;
    }

</style>
