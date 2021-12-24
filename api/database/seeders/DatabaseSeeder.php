<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create(
            [
                'name' => 'Aezur',
                'email' => 'test@test.com',
                'email_verified_at' => null,
                'password' => Hash::make('Testing123')
            ]
        );
    }
}
