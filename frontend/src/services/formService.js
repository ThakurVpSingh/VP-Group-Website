import { getApiUrl } from '../config';

/**
 * Service to handle form submissions via Web3Forms or VP Backend.
 * Web3Forms is used as a reliable primary mechanism for email delivery.
 */
export const submitContactForm = async (formData, options = {}) => {
    const { 
        source = 'Contact Form', 
        useWeb3Forms = true, 
        accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'b947e842-2c2d-4c65-83e0-e9108a082e1c' 
    } = options;

    // 1. Primary Mechanism: Web3Forms (Highly Reliable)
    if (useWeb3Forms) {
        try {
            const body = new FormData();
            body.append("access_key", accessKey);
            body.append("from_name", "VP Group Portal");
            body.append("subject", `New Submission from ${source}`);
            body.append("submission_source", source);

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    body.append(key, value);
                }
            });

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: body
            });

            const result = await response.json();
            if (result.success) {
                return { success: true, message: 'Submission successful via Mission Control.' };
            } else {
                throw new Error(result.message || 'Web3Forms submission failed');
            }
        } catch (error) {
            console.warn('Web3Forms failed, falling back to VP Backend:', error);
            // Fallback to backend if Web3Forms fails
        }
    }

    // 2. Fallback / Secondary Mechanism: VP Backend
    try {
        const response = await fetch(getApiUrl('/api/contact'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name || formData.companyName || 'Anonymous',
                email: formData.email || formData.website || 'no-email@vp.group',
                subject: formData.subject || `Inquiry: ${source}`,
                message: formData.message || JSON.stringify(formData, null, 2)
            })
        });

        const data = await response.json();
        if (response.ok) {
            return { success: true, message: 'Submission received by VP Backend.' };
        } else {
            return { success: false, error: data.error || 'Backend rejected the mission.' };
        }
    } catch (error) {
        console.error('All submission mechanisms failed:', error);
        return { success: false, error: 'Communication breakdown. Ensure VP Systems are online.' };
    }
};
