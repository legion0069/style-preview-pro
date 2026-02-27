

# Plan: Remove Login Page

## Change
Skip the login screen entirely — clicking "Try Demo" goes straight to the BarberDashboard instead of showing the LoginForm.

## Implementation

**`src/pages/Index.tsx`**:
- Remove the `showLogin` state and the `if (showLogin)` block that renders `LoginForm`
- Change both "Try Demo" buttons to call `setIsLoggedIn(true)` directly instead of `setShowLogin(true)`
- Remove the `LoginForm` import

**`src/components/LoginForm.tsx`**:
- Can be deleted (no longer referenced)

