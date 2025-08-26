import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'

function ActionMenu() {
    return (
        <div>
            <Button variant="default" >
    <PlusIcon /> New Student
            </Button>
        </div>
    )
}

export { ActionMenu }