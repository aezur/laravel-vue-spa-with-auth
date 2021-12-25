<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create(
            [
                'name' => 'User',
                'email' => 'user@test.com',
                'email_verified_at' => null,
                'password' => Hash::make('Testing123'),
            ]
        );
        \App\Models\User::factory(1)->create(
            [
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Testing123'),
                'is_admin' => true,
            ]
        );
        \App\Models\User::factory(20)->create();
    }
}
