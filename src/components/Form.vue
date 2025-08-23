<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

const submitForm = () => {
    validateName(true);
    validatePassword(true);

    if (!errors.value.username && !errors.value.password && formData.value.gender && formData.value.reason) {
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();

        Object.keys(errors.value).forEach(key => {
            errors.value[key] = null;
        });
    }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: ''
    }

    Object.keys(errors.value).forEach(key => {
        errors.value[key] = null;
    });
}

const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
})

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
}

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>"]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long. `
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
}
</script>

<template>
    <!-- Bootstrap Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container">
            <div class="navbar-nav mx-auto">
                <a class="nav-link active" href="#">HOME</a>
                <a class="nav-link" href="#">ABOUT</a>
                <a class="nav-link" href="#">CONTACT US</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <!-- W4. Library Registration Form -->
        <div class="row mb-5">
            <div class="col-md-8 offset-md-2">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mb-0 me-2">W4. Library Registration Form</h2>
                    <i class="bi bi-server text-muted"></i>
                </div>
                <p class="text-muted mb-4">This form now includes validation. Registered users are displayed in a data
                    table below (PrimeVue).</p>

                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                                @input="() => validateName(false)" v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <div class="position-relative">
                                <input type="password" class="form-control" id="password"
                                    @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                    v-model="formData.password">
                            </div>
                            <div v-if="errors.password" class="text-danger"> {{ errors.password }} </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian"
                                    v-model="formData.isAustralian">
                                <label for="isAustralian" class="form-check-label">Australian Resident?</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" required v-model="formData.gender">
                                <option value="">Please select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <div class="position-relative">
                            <textarea class="form-control" id="reason" rows="3" minlength="10" maxlength="100"
                                v-model="formData.reason"></textarea>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- PrimeVue DataTable -->
        <div class="row mb-5">
            <div class="col-12">
                <div class="d-flex align-items-center mb-3">
                    <h3 class="mb-0 me-2">This is a Primevue Datatable.</h3>
                </div>
                <DataTable :value="submittedCards" stripedRows showGridlines class="p-datatable-sm"
                    responsiveLayout="scroll">
                    <Column field="username" header="Username" sortable></Column>
                    <Column field="password" header="Password" sortable>
                        <template #body="slotProps">
                            <span v-if="slotProps.data.username === 'RKent'">
                                {{ slotProps.data.password }} ***
                            </span>
                            <span v-else>
                                {{ slotProps.data.password }}
                            </span>
                        </template>
                    </Column>
                    <Column field="isAustralian" header="Australian Resident" sortable>
                        <template #body="slotProps">
                            {{ slotProps.data.isAustralian ? 'true' : 'false' }}
                        </template>
                    </Column>
                    <Column field="gender" header="Gender" sortable></Column>
                    <Column field="reason" header="Reason" sortable></Column>
                </DataTable>
            </div>
        </div>

        <!-- Bootstrap Cards -->
        <div class="row">
            <div class="col-12">
                <div class="d-flex align-items-center mb-3">
                    <h3 class="mb-0 me-2">User Information</h3>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-3" v-for="(user, index) in submittedCards" :key="index">
                        <div class="card h-100">
                            <div class="card-header bg-primary text-white">
                                <h5 class="card-title mb-0">User Information</h5>
                            </div>
                            <div class="card-body">
                                <div class="card-line">
                                    <p class="card-text"><strong>Username:</strong> {{ user.username }}</p>
                                </div>
                                <div class="card-line">
                                    <p class="card-text">
                                        <strong>Password:</strong>
                                        <span v-if="user.username === 'RKent'">
                                            {{ user.password }} ***
                                        </span>
                                        <span v-else>
                                            {{ user.password }}
                                        </span>
                                    </p>
                                </div>
                                <div class="card-line">
                                    <p class="card-text">
                                        <strong>Australian Resident:</strong>
                                        {{ user.isAustralian ? 'Yes' : 'No' }}
                                    </p>
                                </div>
                                <div class="card-line">
                                    <p class="card-text"><strong>Gender:</strong> {{ user.gender }}</p>
                                </div>
                                <div class="card-line">
                                    <p class="card-text"><strong>Reason:</strong> {{ user.reason }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar-brand {
    font-weight: bold;
}

.nav-link.active {
    font-weight: bold;
}

.navbar-nav {
    display: flex;
    align-items: center;
}

.navbar-nav .nav-link {
    margin: 0 15px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.navbar-nav .nav-link.active {
    font-weight: bold;
    text-decoration: underline;
}

.bi-server {
    font-size: 1.2rem;
}

.badge {
    font-size: 0.75rem;
}

.card-header {
    border-bottom: none;
}

.card-title {
    font-size: 1.1rem;
}

.card-text {
    margin-bottom: 0.5rem;
}

.card-text:last-child {
    margin-bottom: 0;
}

.col-md-3 {
    flex: 0 0 25%;
    max-width: 25%;
}

@media (max-width: 767.98px) {
    .col-md-3 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

.card.h-100 {
    height: 100% !important;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-line {
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
}

.card-line:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
}

.card-text {
    margin-bottom: 0;
}
</style>