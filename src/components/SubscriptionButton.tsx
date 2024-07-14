'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { Crown, Sparkles } from 'lucide-react'

type Props = { isPro: boolean }

const SubscriptionButton = ({ isPro }: Props) => {
    const [loading, setLoading] = React.useState(false);
    const handleSubscription = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Button disabled={loading} onClick={handleSubscription} className='bg-primary'>
                {loading ? (
                    "Processing..."
                ) : (
                    isPro ? (
                        <>Subscriptions<Sparkles className='w-4 h-4 ml-2' /> </>
                    ) : (
                        <>GenieAI Pro <Crown className="w-4 h-4 ml-2" /></>
                        
                    )
                )}
            </Button>
        </>

    )
}

export default SubscriptionButton;