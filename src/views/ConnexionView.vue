<script setup>
</script>

<template>
  <main>
    <div>
        <div><h1>Connexion</h1></div>
        <form action="">
            <div>
                <label>E-mail</label>
                <div>
                    <input class="input" required="required" placeholder="E-mail">
                </div>
            </div>
            <div>
                <label>Mot de passe</label>
                <div>
                    <input class="input" required="required" placeholder="Mot de passe">
                </div>
            </div>
            <button type="submit">Connexion</button>

            <button>
                <router-link :to="`/inscription`">Créer un compte ?</router-link>
            </button>
        </form>
    </div>
  </main>
</template>
<style scoped>

</style>