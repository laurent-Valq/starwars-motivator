export const validateEmail = (email: string): { valid: boolean; error?: string } => {
    // Regex pour email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Format d'email invalide | Invalid email format" }
    }
  
    // Vérifier les extensions autorisées
    const allowedDomains = [
        'gmail.com',
        'hotmail.com',
        'outlook.com',
        'yahoo.com',
        'yahoo.fr',
        'icloud.com',
        'protonmail.com',
        'live.com',
        'msn.com',
        'orange.fr',
        'free.fr',
        'wanadoo.fr',
        'sfr.fr',
        'laposte.net'
      ]
      
      const emailDomain = email.toLowerCase().split('@')[1]
      
      if (!allowedDomains.includes(emailDomain)) {
        return { 
          valid: false, 
          error: `Domaine d'email non autorisé. Utilisez : ${allowedDomains.slice(0, 5).join(', ')}... | Email domain not allowed. Use: ${allowedDomains.slice(0, 5).join(', ')}...`
        }
      }
  
    return { valid: true }
  }
  
  export const validatePassword = (password: string): { valid: boolean; error?: string } => {
    if (password.length < 8) {
      return { valid: false, error: "Le mot de passe doit contenir au moins 8 caractères | Password must be at least 8 characters" }
    }
  
    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: "Le mot de passe doit contenir au moins 1 majuscule | Password must contain at least 1 uppercase letter" }
    }
  
    if (!/[a-z]/.test(password)) {
      return { valid: false, error: "Le mot de passe doit contenir au moins 1 minuscule | Password must contain at least 1 lowercase letter" }
    }
  
    if (!/[0-9]/.test(password)) {
      return { valid: false, error: "Le mot de passe doit contenir au moins 1 chiffre | Password must contain at least 1 number" }
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { valid: false, error: "Le mot de passe doit contenir au moins 1 caractère spécial (!@#$%^&*...) | Password must contain at least 1 special character (!@#$%^&*...)" }
    }
  
    return { valid: true }
  }