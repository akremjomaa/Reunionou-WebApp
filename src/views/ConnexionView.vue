<script setup>
</script>

<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen is-4-fullhd is-offset-4-fullhd">
        <h1 class="title is-2 has-text-centered">Connexion</h1>
        <form action="" class="box">
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" required="required" placeholder="Votre e-mail">
                </div>
            </div>
            <div class="field">
                <label class="label">Mot de passe</label>
                <div class="control">
                    <input class="input" required="required" placeholder="Votre mot de passe">
                </div>
            </div>

            <div class="is-flex is-flex-direction-column is-align-items-center">
                <button class="button is-link mb-3" type="submit">Connexion</button>
                <router-link class="button is-primary is-outlined" to="/inscription">Créer un compte</router-link>
            </div>
        </form>
    </section>
</template>
<style scoped>

</style>