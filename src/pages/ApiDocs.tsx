
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Lock, Key } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ApiDocs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">API Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Integrate GiveMyCertificate's powerful certificate generation capabilities into your applications.
            </p>
          </div>

          <Tabs defaultValue="authentication" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication" className="space-y-6">
              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Authentication</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  To authenticate your API requests, you'll need an API key. Include it in the headers of your requests:
                </p>
                <div className="bg-muted p-4 rounded-md font-mono text-sm mb-4">
                  Authorization: Bearer your-api-key-here
                </div>
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  Get API Key
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">API Endpoints</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Generate Certificate</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mb-4">
                      POST /api/v1/certificates/generate
                    </div>
                    <h4 className="font-medium mb-2">Request Body:</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`{
  "template_id": "string",
  "recipient": {
    "name": "string",
    "email": "string"
  },
  "custom_fields": {
    "course_name": "string",
    "completion_date": "string"
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">List Templates</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mb-4">
                      GET /api/v1/templates
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Verify Certificate</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mb-4">
                      GET /api/v1/certificates/verify/:certificate_id
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <div className="p-6 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Code Examples</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">JavaScript/Node.js</h3>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`const response = await fetch('https://api.givemycertificate.com/v1/certificates/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    template_id: 'template_123',
    recipient: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    custom_fields: {
      course_name: 'Advanced Web Development',
      completion_date: '2025-04-26'
    }
  })
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Python</h3>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import requests

response = requests.post(
    'https://api.givemycertificate.com/v1/certificates/generate',
    headers={
        'Authorization': 'Bearer your-api-key',
        'Content-Type': 'application/json'
    },
    json={
        'template_id': 'template_123',
        'recipient': {
            'name': 'John Doe',
            'email': 'john@example.com'
        },
        'custom_fields': {
            'course_name': 'Advanced Web Development',
            'completion_date': '2025-04-26'
        }
    }
)

data = response.json()
print(data)`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
